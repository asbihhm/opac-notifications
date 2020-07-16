{ sources ? import ./nix/sources.nix
, pkgs ? import sources.nixpkgs {
    overlays = [(_: _: { niv = import sources.niv {}; })];
    config = {};
  }
, system ? builtins.currentSystem
, nodePackages ? import ./nix/node-composition.nix { inherit pkgs system; }
}:
let
  sourceDir = ./.;

  gitIgnored = (import sources.gitignore { inherit (pkgs) lib; }).gitignoreFilter sourceDir;

  srcIgnored = path: let baseName = builtins.baseNameOf path; in ! (
    builtins.match "^\\..*$" baseName != null ||
    builtins.match "^test/*" baseName != null ||
    baseName == "jsconfig.json" ||
    baseName == "generate.sh"
  );

  src = pkgs.lib.cleanSourceWith {
    src = sourceDir;
    filter = path: type: gitIgnored path type && srcIgnored path;
  };

  buildInputs = with pkgs; [
    selenium-server-standalone
    chromedriver
    chromium
  ];

  opacServerBin = "${pkgs.selenium-server-standalone}/bin/selenium-server";
  opacDriverBin = "${pkgs.chromedriver}/bin/chromedriver";
  opacChromeBin = "${pkgs.chromium}/bin/chromium";
in
{
  inherit pkgs;
  nodePackages = nodePackages // {
    tarball = nodePackages.tarball.override { inherit src; };
    package = nodePackages.package.override(oldAttrs: {
      inherit src;
      buildInputs = oldAttrs.buildInputs ++ buildInputs;
      preRebuild = ''
        substituteInPlace bin/opac-notifications \
          --replace process.env.OPAC_DRIVER_BIN \'${opacDriverBin}\' \
          --replace process.env.OPAC_CHROME_BIN \'${opacChromeBin}\'
      '';
      postInstall = ''
        ln -s ${opacServerBin} $out/bin/opac-selenium-server
      '';
    });
    shell = pkgs.mkShell {
      name = nodePackages.shell.name;
      buildInputs = nodePackages.shell.buildInputs ++ buildInputs;
      OPAC_DRIVER_BIN = opacDriverBin;
      OPAC_CHROME_BIN = opacChromeBin;
    };
  };
}
