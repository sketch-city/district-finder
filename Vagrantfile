# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

    config.vm.box = "scotch/box"
    config.vm.network "private_network", ip: "192.168.33.11"
    config.vm.network "forwarded_port", guest: 80, host: 8000
    config.vm.hostname = "districtfinder"
    config.vm.synced_folder ".", "/var/www", :nfs => { :mount_options => ["dmode=777","fmode=666"] }

    # This is more a personal thing, so it's in the gitignore. Do your own if you like.
    aliasesPath = "aliases"
    if File.exists? aliasesPath then
      config.vm.provision "file", source: aliasesPath, destination: "~/.bash_aliases"
    end

    # Setup the server with things needed to develop
    config.vm.provision "shell", inline: <<-SHELL
      sudo apt-get -y update
      sudo npm install -g foreman
      sudo npm install -g knex
      sudo apt-get -y install postgis
      sudo apt-get -y install postgresql-9.3-postgis-2.1
      sudo apt-get -y install gdal-bin

      # Database stuff
      export PGHOST="localhost"
      export PGUSER="root"
      export PGPASSWORD="root"
      createdb districtfinder
      psql -d districtfinder -c "CREATE EXTENSION postgis;"

    SHELL
end
