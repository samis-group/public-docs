# Vagrant

- Upgrade vagrant version in windows to match apt's relatively "Bleeding edge"

  ```powershell
  $vag_ver = wsl.exe -e sh -c "vagrant -v | cut -d\  -f 2"
  Invoke-WebRequest -Uri "https://releases.hashicorp.com/vagrant/${vag_ver}/vagrant_${vag_ver}_windows_amd64.msi" -OutFile "$HOME\Downloads\vagrant_${vag_ver}_windows_amd64.msi"
  ```

  - Your browser is going to be faster than cli, so just put this link in your browser to download it there if you prefer

    ```powershell
    $vag_ver = wsl.exe -e sh -c "vagrant -v | cut -d\  -f 2"
    echo "https://releases.hashicorp.com/vagrant/${vag_ver}/vagrant_${vag_ver}_windows_amd64.msi"
    ```

- Install a few vagrant plugins to handle compatibility with WSL <-> Windows, and overall make your experience good.
  
  ```powershell
  vagrant plugin install virtualbox_WSL2 vagrant-vbguest vagrant-hosts
  ```
