# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

    config.vm.box = "scotch/box"
    config.vm.network "private_network", ip: "192.168.33.11"
    config.vm.network "forwarded_port", guest: 80, host: 8001
    config.vm.network "forwarded_port", guest: 3306,  host: 33307
    config.vm.hostname = "districtfinder"
    config.vm.synced_folder ".", "/var/www", :nfs => { :mount_options => ["dmode=777","fmode=666"] }

    config.vm.provision "shell", inline: <<-SHELL
      sudo apt-get -y update
      sudo apt-get -y install postgis
      sudo apt-get -y install postgresql-9.3-postgis-2.1
      export PGHOST="localhost"
      export PGUSER="root"
      export PGPASSWORD="root"
      psql -d scotchbox -c "CREATE EXTENSION postgis;"
    SHELL
end
