# Quick MySQL Reference

## Basics

> Some very basic usage

```SQL
SHOW DATABASES;
USE <dbname>;
CREATE DATABASE <dbname>;
SHOW TABLES;
```

> extract only those records that fulfill a specified condition

```SQL
WHERE <condition>
```

> See table's fields and formats

```SQL
DESCRIBE <table_name>;
```

> TRUE if both expressions are TRUE

```SQL
AND
```

> TRUE if either expression is TRUE

```SQL
OR
```

> TRUE if the operand is equal to one of a list of expressions

```SQL
IN
```

> Returns TRUE if the expression is NOT TRUE

```SQL
NOT
```

> useful when specifying a search condition within your WHERE clause (pattern matching)

```SQL
LIKE
```

> Equal / Not equal / Less than / Greater than / Less or equal than / Greater or equal than

```SQL
= / != / < / > / <= / >=
```

> used with SELECT to sort the returned data (“desc” optional to sort by descending order)

```SQL
ORDER BY <field> [desc]
```

> limit to records 1 through 5

```SQL
LIMIT 1,5
```

> Shows unique records

```SQL
SELECT DISTINCT
```

> comma used to denote multiple fields

```SQL
,
```

> full stop, shorthand for DB.TABLE

```SQL
.
```

> combine data from multiple tables into one comprehensive dataset (removing dupes)

```SQL
UNION
```

> does not perform the duplicate removal operation over the data set that UNION does

```SQL
UNION ALL
```

> add new rows of data to a table in the database.

```SQL
INSERT INTO <table>
```

> deletes a database

```SQL
DROP DATABASE <dbname>;
```

> deletes a table

```SQL
DROP TABLE <table_name>;
```

## Combining AND & OR

```SQL
SELECT * FROM customers WHERE City = 'New York' AND (Age=30 OR Age=35);
```

## The IN Operator

The IN operator is used when you want to compare a column with more than one value. For example, rather than chaining or’s, just use IN:

```SQL
SELECT * FROM customers WHERE City IN ('New York', 'Los Angeles', 'Chicago');
```

## The Like Operator

SQL pattern matching enables you to use "_" to match any single character and "%" to match an arbitrary number of characters (including zero characters).

For example, to select employees whose FirstNames begin with the letter A, you would use the following query:

```SQL
SELECT * FROM employees WHERE FirstName LIKE 'A%';
```

## Joins

Only the records matching the join condition are returned.

Inner join works like:

![inner-join](/artifacts/images/MySQL/inner_join.jpg)

**Example**:

```SQL
SELECT column_name(s)  
FROM table1 INNER JOIN table2  
ON table1.column_name=table2.column_name;
```

Left join works like:

![left-join](/artifacts/images/MySQL/left_join.jpg)

**Example**:

```SQL
SELECT table1.column1, table2.column2...  
FROM table1 LEFT JOIN table2  
ON table1.column_name = table2.column_name;
```

Right join works like:

![right-join](/artifacts/images/MySQL/right_join.jpg)

**Example**:

```SQL
SELECT table1.column1, table2.column2...  
FROM table1 RIGHT JOIN table2  
ON table1.column_name = table2.column_name;
```

## Checking/Repairing MySQL DB's

```SQL
mysqlcheck -A -r
mysqlcheck --auto-repair --optimize --all-databases
myisamchk /var/lib/mysql/*/*.MYI
```

## See running MySQL Processes

```SQL
mysqladmin processlist
mysql -e "show processlist"
select * from INFORMATION_SCHEMA.PROCESSLIST where db = 'db_name';    # For shared #
```

## mysql files (defaults)

> Mysql Config

```shell
/etc/my.cnf
```

> mysql error logs

```shell
/var/lib/mysql/<hostname>.err
```

## Show MYSQL table engines

```SQL
SELECT TABLE_NAME, ENGINE FROM information_schema.tables WHERE TABLE_SCHEMA = 'dbname';
```

## Import/Export DB's

### Full process (multiple DB’s) from one server to another

```shell
# On old server
mkdir mysqlbackup & cd mysqlbackup  
for I in $(echo "show databases;" | mysql | grep -v Database); do mysqldump $I > "$I.sql"; done  
rsync -av /root/mysqlbackup/ root@<newvpsip>:/mysqldump  
# Mysql Import on new VPS:  
rm -f mysql.sql; for SQL in *.sql; do DB=${SQL/\.sql/}; echo importing $DB; mysql $DB < $SQL; done
```

### Import

> Import ALL DB's at once

```shell
mysql database_name < ~/filename.sql
mysql -u user -p database_name < /root/filename.sql
```

### Export

> Export ALL DB's at once

```shell
mysqldump database_name > ~/filename.sql
mysqldump -u user -p database_name > ~/filename.sql
mysql -u user -p database_name > ~/filename.sql
mysql -N -e 'show databases' | while read dbname; do mysqldump --complete-insert --routines --triggers --single-transaction "$dbname" > ~/[dir]/"$dbname".sql; done
```

## Show Grants/Privileges for users on DB's

```SQL
SHOW GRANTS FOR 'qualifi2com'@'localhost';
```

## Update things in MySQL

```SQL
UPDATE mysql.proc SET definer = 'qualifi2com@localhost' WHERE db = 'qualifi2com_qualifi';
```

**Note**: mysql.proc refers to the database mysql and table proc. Shorthand rather than jumping into db etc.

## Show certain information

```SQL
SELECT definer,db FROM mysql.proc;
```

**Note**: comma (,) is used to denote or use multiple fields.

## Update MySQL root password

for version `5.7`:

```SQL
mysqld_safe --skip-grant-tables &
mysql -u root
UPDATE mysql.user SET authentication_string=password('NEW-PASSWORD') WHERE user='root';
flush privileges;
quit;
```

If the above doesn’t work, try the below command:

```SQL
UPDATE mysql.user SET Password=PASSWORD('NEW-PASSWORD') WHERE User='root';
SET PASSWORD = PASSWORD('your_new_password');
```

Restart MySQL:

```shell
service mysqld restart
```

Now Test:

```shell
mysql -u root
```

### Common Commands

> To show all databases like <search_term>

```SQL
show databases like 'hypno%';
```
