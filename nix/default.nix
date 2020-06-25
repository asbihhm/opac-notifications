{ sources ? import ./sources.nix }:
import sources.nixpkgs {
  overlays = [
    (_: _:
      { niv = import sources.niv {}; }
    )
  ];
  config = {};
}
