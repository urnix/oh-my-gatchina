#!/bin/sh

blockinfo() { echo -e "\n\n\033[0;36m$*\033[0m\n\n"; }
info() { echo -e "\n\033[1;34m$*\033[0m\n"; }
info_() { echo -e "commented log"; }
normal() { echo -e "$*"; }
success() { echo -e "\n\033[0;32m$*\033[0m\n"; }
error() { echo -e "\n\n\033[0;31m$*\033[0m\n"; exit 1; }
