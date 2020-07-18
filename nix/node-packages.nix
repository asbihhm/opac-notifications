# This file has been generated by node2nix 1.8.0. Do not edit!

{nodeEnv, fetchurl, fetchgit, globalBuildInputs ? []}:

let
  sources = {
    "@slack/types-1.7.0" = {
      name = "_at_slack_slash_types";
      packageName = "@slack/types";
      version = "1.7.0";
      src = fetchurl {
        url = "https://registry.npmjs.org/@slack/types/-/types-1.7.0.tgz";
        sha512 = "aigLPmTO513JxeFyeII/74y+S5jU39tabDWPsZyMHJWCYqK3vCkRvV73NL+Ay+Tq5RC2NgSmkedk1wvQJ6oXLg==";
      };
    };
    "@slack/webhook-5.0.3" = {
      name = "_at_slack_slash_webhook";
      packageName = "@slack/webhook";
      version = "5.0.3";
      src = fetchurl {
        url = "https://registry.npmjs.org/@slack/webhook/-/webhook-5.0.3.tgz";
        sha512 = "51vnejJ2zABNumPVukOLyerpHQT39/Lt0TYFtOEz/N2X77bPofOgfPj2atB3etaM07mxWHLT9IRJ4Zuqx38DkQ==";
      };
    };
    "@types/node-14.0.13" = {
      name = "_at_types_slash_node";
      packageName = "@types/node";
      version = "14.0.13";
      src = fetchurl {
        url = "https://registry.npmjs.org/@types/node/-/node-14.0.13.tgz";
        sha512 = "rouEWBImiRaSJsVA+ITTFM6ZxibuAlTuNOCyxVbwreu6k6+ujs7DfnU9o+PShFhET78pMBl3eH+AGSI5eOTkPA==";
      };
    };
    "axios-0.19.2" = {
      name = "axios";
      packageName = "axios";
      version = "0.19.2";
      src = fetchurl {
        url = "https://registry.npmjs.org/axios/-/axios-0.19.2.tgz";
        sha512 = "fjgm5MvRHLhx+osE2xoekY70AhARk3a6hkN+3Io1jc00jtquGvxYlKlsFUhmUET0V5te6CcZI7lcv2Ym61mjHA==";
      };
    };
    "balanced-match-1.0.0" = {
      name = "balanced-match";
      packageName = "balanced-match";
      version = "1.0.0";
      src = fetchurl {
        url = "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.0.tgz";
        sha1 = "89b4d199ab2bee49de164ea02b89ce462d71b767";
      };
    };
    "brace-expansion-1.1.11" = {
      name = "brace-expansion";
      packageName = "brace-expansion";
      version = "1.1.11";
      src = fetchurl {
        url = "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.11.tgz";
        sha512 = "iCuPHDFgrHX7H2vEI/5xpz07zSHB00TpugqhmYtVmMO6518mCuRMoOYFldEBl0g187ufozdaHgWKcYFb61qGiA==";
      };
    };
    "concat-map-0.0.1" = {
      name = "concat-map";
      packageName = "concat-map";
      version = "0.0.1";
      src = fetchurl {
        url = "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz";
        sha1 = "d8a96bd77fd68df7793a73036a3ba0d5405d477b";
      };
    };
    "core-util-is-1.0.2" = {
      name = "core-util-is";
      packageName = "core-util-is";
      version = "1.0.2";
      src = fetchurl {
        url = "https://registry.npmjs.org/core-util-is/-/core-util-is-1.0.2.tgz";
        sha1 = "b5fd54220aa2bc5ab57aab7140c940754503c1a7";
      };
    };
    "debug-3.1.0" = {
      name = "debug";
      packageName = "debug";
      version = "3.1.0";
      src = fetchurl {
        url = "https://registry.npmjs.org/debug/-/debug-3.1.0.tgz";
        sha512 = "OX8XqP7/1a9cqkxYw2yXss15f26NKWBpDXQd0/uK/KPqdQhxbPa994hnzjcE2VqQpDslf55723cKPUOGSmMY3g==";
      };
    };
    "follow-redirects-1.5.10" = {
      name = "follow-redirects";
      packageName = "follow-redirects";
      version = "1.5.10";
      src = fetchurl {
        url = "https://registry.npmjs.org/follow-redirects/-/follow-redirects-1.5.10.tgz";
        sha512 = "0V5l4Cizzvqt5D44aTXbFZz+FtyXV1vrDN6qrelxtfYQKW0KO0W2T/hkE8xvGa/540LkZlkaUjO4ailYTFtHVQ==";
      };
    };
    "fs.realpath-1.0.0" = {
      name = "fs.realpath";
      packageName = "fs.realpath";
      version = "1.0.0";
      src = fetchurl {
        url = "https://registry.npmjs.org/fs.realpath/-/fs.realpath-1.0.0.tgz";
        sha1 = "1504ad2523158caa40db4a2787cb01411994ea4f";
      };
    };
    "glob-7.1.6" = {
      name = "glob";
      packageName = "glob";
      version = "7.1.6";
      src = fetchurl {
        url = "https://registry.npmjs.org/glob/-/glob-7.1.6.tgz";
        sha512 = "LwaxwyZ72Lk7vZINtNNrywX0ZuLyStrdDtabefZKAY5ZGJhVtgdznluResxNmPitE0SAO+O26sWTHeKSI2wMBA==";
      };
    };
    "immediate-3.0.6" = {
      name = "immediate";
      packageName = "immediate";
      version = "3.0.6";
      src = fetchurl {
        url = "https://registry.npmjs.org/immediate/-/immediate-3.0.6.tgz";
        sha1 = "9db1dbd0faf8de6fbe0f5dd5e56bb606280de69b";
      };
    };
    "inflight-1.0.6" = {
      name = "inflight";
      packageName = "inflight";
      version = "1.0.6";
      src = fetchurl {
        url = "https://registry.npmjs.org/inflight/-/inflight-1.0.6.tgz";
        sha1 = "49bd6331d7d02d0c09bc910a1075ba8165b56df9";
      };
    };
    "inherits-2.0.4" = {
      name = "inherits";
      packageName = "inherits";
      version = "2.0.4";
      src = fetchurl {
        url = "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz";
        sha512 = "k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==";
      };
    };
    "isarray-1.0.0" = {
      name = "isarray";
      packageName = "isarray";
      version = "1.0.0";
      src = fetchurl {
        url = "https://registry.npmjs.org/isarray/-/isarray-1.0.0.tgz";
        sha1 = "bb935d48582cba168c06834957a54a3e07124f11";
      };
    };
    "jszip-3.5.0" = {
      name = "jszip";
      packageName = "jszip";
      version = "3.5.0";
      src = fetchurl {
        url = "https://registry.npmjs.org/jszip/-/jszip-3.5.0.tgz";
        sha512 = "WRtu7TPCmYePR1nazfrtuF216cIVon/3GWOvHS9QR5bIwSbnxtdpma6un3jyGGNhHsKCSzn5Ypk+EkDRvTGiFA==";
      };
    };
    "lie-3.3.0" = {
      name = "lie";
      packageName = "lie";
      version = "3.3.0";
      src = fetchurl {
        url = "https://registry.npmjs.org/lie/-/lie-3.3.0.tgz";
        sha512 = "UaiMJzeWRlEujzAuw5LokY1L5ecNQYZKfmyZ9L7wDHb/p5etKaxXhohBcrw0EYby+G/NA52vRSN4N39dxHAIwQ==";
      };
    };
    "minimatch-3.0.4" = {
      name = "minimatch";
      packageName = "minimatch";
      version = "3.0.4";
      src = fetchurl {
        url = "https://registry.npmjs.org/minimatch/-/minimatch-3.0.4.tgz";
        sha512 = "yJHVQEhyqPLUTgt9B83PXu6W3rx4MvvHvSUvToogpwoGDOUQ+yDrR0HRot+yOCdCO7u4hX3pWft6kWBBcqh0UA==";
      };
    };
    "ms-2.0.0" = {
      name = "ms";
      packageName = "ms";
      version = "2.0.0";
      src = fetchurl {
        url = "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz";
        sha1 = "5608aeadfc00be6c2901df5f9861788de0d597c8";
      };
    };
    "once-1.4.0" = {
      name = "once";
      packageName = "once";
      version = "1.4.0";
      src = fetchurl {
        url = "https://registry.npmjs.org/once/-/once-1.4.0.tgz";
        sha1 = "583b1aa775961d4b113ac17d9c50baef9dd76bd1";
      };
    };
    "os-tmpdir-1.0.2" = {
      name = "os-tmpdir";
      packageName = "os-tmpdir";
      version = "1.0.2";
      src = fetchurl {
        url = "https://registry.npmjs.org/os-tmpdir/-/os-tmpdir-1.0.2.tgz";
        sha1 = "bbe67406c79aa85c5cfec766fe5734555dfa1274";
      };
    };
    "pako-1.0.11" = {
      name = "pako";
      packageName = "pako";
      version = "1.0.11";
      src = fetchurl {
        url = "https://registry.npmjs.org/pako/-/pako-1.0.11.tgz";
        sha512 = "4hLB8Py4zZce5s4yd9XzopqwVv/yGNhV1Bl8NTmCq1763HeK2+EwVTv+leGeL13Dnh2wfbqowVPXCIO0z4taYw==";
      };
    };
    "path-is-absolute-1.0.1" = {
      name = "path-is-absolute";
      packageName = "path-is-absolute";
      version = "1.0.1";
      src = fetchurl {
        url = "https://registry.npmjs.org/path-is-absolute/-/path-is-absolute-1.0.1.tgz";
        sha1 = "174b9268735534ffbc7ace6bf53a5a9e1b5c5f5f";
      };
    };
    "process-nextick-args-2.0.1" = {
      name = "process-nextick-args";
      packageName = "process-nextick-args";
      version = "2.0.1";
      src = fetchurl {
        url = "https://registry.npmjs.org/process-nextick-args/-/process-nextick-args-2.0.1.tgz";
        sha512 = "3ouUOpQhtgrbOa17J7+uxOTpITYWaGP7/AhoR3+A+/1e9skrzelGi/dXzEYyvbxubEF6Wn2ypscTKiKJFFn1ag==";
      };
    };
    "readable-stream-2.3.7" = {
      name = "readable-stream";
      packageName = "readable-stream";
      version = "2.3.7";
      src = fetchurl {
        url = "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz";
        sha512 = "Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==";
      };
    };
    "rimraf-2.7.1" = {
      name = "rimraf";
      packageName = "rimraf";
      version = "2.7.1";
      src = fetchurl {
        url = "https://registry.npmjs.org/rimraf/-/rimraf-2.7.1.tgz";
        sha512 = "uWjbaKIK3T1OSVptzX7Nl6PvQ3qAGtKEtVRjRuazjfL3Bx5eI409VZSqgND+4UNnmzLVdPj9FqFJNPqBZFve4w==";
      };
    };
    "safe-buffer-5.1.2" = {
      name = "safe-buffer";
      packageName = "safe-buffer";
      version = "5.1.2";
      src = fetchurl {
        url = "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz";
        sha512 = "Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g==";
      };
    };
    "selenium-webdriver-4.0.0-alpha.7" = {
      name = "selenium-webdriver";
      packageName = "selenium-webdriver";
      version = "4.0.0-alpha.7";
      src = fetchurl {
        url = "https://registry.npmjs.org/selenium-webdriver/-/selenium-webdriver-4.0.0-alpha.7.tgz";
        sha512 = "D4qnTsyTr91jT8f7MfN+OwY0IlU5+5FmlO5xlgRUV6hDEV8JyYx2NerdTEqDDkNq7RZDYc4VoPALk8l578RBHw==";
      };
    };
    "set-immediate-shim-1.0.1" = {
      name = "set-immediate-shim";
      packageName = "set-immediate-shim";
      version = "1.0.1";
      src = fetchurl {
        url = "https://registry.npmjs.org/set-immediate-shim/-/set-immediate-shim-1.0.1.tgz";
        sha1 = "4b2b1b27eb808a9f8dcc481a58e5e56f599f3f61";
      };
    };
    "string_decoder-1.1.1" = {
      name = "string_decoder";
      packageName = "string_decoder";
      version = "1.1.1";
      src = fetchurl {
        url = "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz";
        sha512 = "n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==";
      };
    };
    "tmp-0.0.30" = {
      name = "tmp";
      packageName = "tmp";
      version = "0.0.30";
      src = fetchurl {
        url = "https://registry.npmjs.org/tmp/-/tmp-0.0.30.tgz";
        sha1 = "72419d4a8be7d6ce75148fd8b324e593a711c2ed";
      };
    };
    "util-deprecate-1.0.2" = {
      name = "util-deprecate";
      packageName = "util-deprecate";
      version = "1.0.2";
      src = fetchurl {
        url = "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz";
        sha1 = "450d4dc9fa70de732762fbd2d4a28981419a0ccf";
      };
    };
    "wrappy-1.0.2" = {
      name = "wrappy";
      packageName = "wrappy";
      version = "1.0.2";
      src = fetchurl {
        url = "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz";
        sha1 = "b5243d8f3ec1aa35f1364605bc0d1036e30ab69f";
      };
    };
  };
  args = {
    name = "opac-notifications";
    packageName = "opac-notifications";
    version = "0.7.3";
    src = ./..;
    dependencies = [
      sources."@slack/types-1.7.0"
      sources."@slack/webhook-5.0.3"
      sources."@types/node-14.0.13"
      sources."axios-0.19.2"
      sources."balanced-match-1.0.0"
      sources."brace-expansion-1.1.11"
      sources."concat-map-0.0.1"
      sources."core-util-is-1.0.2"
      sources."debug-3.1.0"
      sources."follow-redirects-1.5.10"
      sources."fs.realpath-1.0.0"
      sources."glob-7.1.6"
      sources."immediate-3.0.6"
      sources."inflight-1.0.6"
      sources."inherits-2.0.4"
      sources."isarray-1.0.0"
      sources."jszip-3.5.0"
      sources."lie-3.3.0"
      sources."minimatch-3.0.4"
      sources."ms-2.0.0"
      sources."once-1.4.0"
      sources."os-tmpdir-1.0.2"
      sources."pako-1.0.11"
      sources."path-is-absolute-1.0.1"
      sources."process-nextick-args-2.0.1"
      sources."readable-stream-2.3.7"
      sources."rimraf-2.7.1"
      sources."safe-buffer-5.1.2"
      sources."selenium-webdriver-4.0.0-alpha.7"
      sources."set-immediate-shim-1.0.1"
      sources."string_decoder-1.1.1"
      sources."tmp-0.0.30"
      sources."util-deprecate-1.0.2"
      sources."wrappy-1.0.2"
    ];
    buildInputs = globalBuildInputs;
    meta = {
      description = "Send the status of OPAC to a channel in Slack.";
      license = "MIT";
    };
    production = true;
    bypassCache = true;
    reconstructLock = false;
  };
in
{
  args = args;
  sources = sources;
  tarball = nodeEnv.buildNodeSourceDist args;
  package = nodeEnv.buildNodePackage args;
  shell = nodeEnv.buildNodeShell args;
}