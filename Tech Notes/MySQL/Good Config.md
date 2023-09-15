# Good Configuration

```ini
# This group is read both by the client and the server
# use it for options that affect everything
[client-server]

# include all files from the config directory
!includedir /etc/my.cnf.d

#########################
# MySQL Configuration   #
#########################
# Max RAM usage: 8GB    #
#########################
# General Configuration #
#########################
[mysqld]
port=3306
socket="/var/lib/mysql/mysql.sock"
local-infile=0            # Disable loading data from files - security
skip-external-locking        # Only needed for multiple processes to access db files simultaneously
default-storage-engine=InnoDB    # Default storage engine (InnoDB or MyISAM)
open_files_limit=20000    # Maximum file-descriptors MySQL can use
wait_timeout=1200        # Time-out on any NON-INTERACTIVE query = 20 minutes - Sleeping connection removal
max_allowed_packet=268435456
tmpdir=/dev/shm

###########################
# Connections and Threads #
###########################
max_connections=512    # If persistent connections are enabled in PHP, max_connections will need to be high (~512)
thread_cache_size=16

#####################
# Buffers and Cache #
#####################
query_cache_type=1        # Enable Query Cache
query_cache_size=256M    # Size of the Query Cache
query_cache_limit=8M    # Maximum size query that will be cached
sort_buffer_size=8M
read_buffer_size=2M
read_rnd_buffer_size=1M
join_buffer_size=16M
max_heap_table_size=32M
table_open_cache=5096    # This should accommodate all tables you have
# MyISAM buffers and cache
key_buffer_size=512M
myisam_sort_buffer_size=64M
# InnoDB buffers and cache
innodb_buffer_pool_size=512M    # If InnoDB mainly used, bump this up to get the most out of the RAM
# innodb_additional_mem_pool_size=20M

##########
# InnoDB #
##########
innodb_buffer_pool_instances=7
innodb_file_per_table=1    # One file per InnoDB table = reclaim space when dropping tables, however not ideal if over 10k tables
innodb_flush_log_at_trx_commit=2    # Flush to redo logs once per second to improve performance
innodb_flush_method=O_DIRECT
innodb_log_file_size=128M
# If enabling this, you will need to shut down MySQL and move the ib_logfile* files out of the MySQL data directory
# and then start MySQL which will generate files to the new standard. If you see Error 1033, this is why.

######################
# Slow Query Logging #
######################
slow_query_log=0
slow_query_log_file=/var/lib/mysql/log-slow-queries.log

#######################
# OTHER CONFIGURATION #
#######################
[mysqldump]
max_allowed_packet=32M
quick
[client]
socket="/var/lib/mysql/mysql.sock"
port=3306
[myisamchk]
read_buffer=2M
write_buffer=2M
sort_buffer_size=128M
key_buffer_size=128M
[mysql]
no-auto-rehash
[mysqlhotcopy]
interactive-timeout

##############################
# END OF MySQL Configuration #
##############################
```
