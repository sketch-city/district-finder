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
      # Run updates and get tools we need
      sudo apt-get -y update
      sudo npm install -g foreman
      sudo apt-get -y install postgis
      sudo apt-get -y install postgresql-9.3-postgis-2.1

      # Database stuff
      export PGHOST="localhost"
      export PGUSER="root"
      export PGPASSWORD="root"
      psql -d scotchbox -c "CREATE DATABASE districtfinder;"
      psql -d districtfinder -c "CREATE EXTENSION postgis;"
      psql -d districtfinder -c "CREATE TABLE precincts;"

      # Add test data to server
      ogr2ogr -f "PostgreSQL" PG:"dbname=districtfinder user=root" "example/harris/precincts2016.geojson" -nln precincts -append
      psql -d districtfinder -c "update precincts set county='harris' where county is null;"

      ogr2ogr -f "PostgreSQL" PG:"dbname=districtfinder user=root" "example/fort-bend/precincts2016.geojson" -nln precincts -append
      psql -d districtfinder -c "update precincts set county='fort-bend' where county is null;"

      ogr2ogr -f "PostgreSQL" PG:"dbname=districtfinder user=root" "example/montgomery/precincts2016.geojson" -nln precincts -append
      psql -d districtfinder -c "update precincts set county='montgomery' where county is null;"
    SHELL
end
