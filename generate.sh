#!/usr/bin/env bash

node2nix -14 --lock ./package-lock.json \
         --output nix/node-packages.nix \
         --node-env nix/node-env.nix \
         --composition nix/node-composition.nix
