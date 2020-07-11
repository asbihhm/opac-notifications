{ pkgs ? import ./nix {}
, src ? pkgs.nix-gitignore.gitignoreSource [ ".git/" ] ./.
}:
pkgs.stdenv.mkDerivation {
  name = "opac-notifications";
  buildInputs = with pkgs; [
    python3
    nodejs-14_x
    selenium-server-standalone
    chromedriver
    chromium
  ];
}
