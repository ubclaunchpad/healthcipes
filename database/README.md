# Database Notes

## CSV Export
Use the following command to export a query into csv:
`mysql -h 127.0.0.1 -P 3306 -u root -p -e 'select * from umami_db.users_table' | sed 's/\t/,/g' > ./output.csv`

## Import CSV to MySQL
The following can be use to reimport a csv file after modifying fields accordingly to new changes using Python:
`TODO`