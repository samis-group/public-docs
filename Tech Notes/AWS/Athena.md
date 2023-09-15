# Athena

## Sample Queries

### Cloudfront

```sql
select * from cloudfront_logs where date = DATE('2022-03-10');

select * from cloudfront_logs where request_ip = 'xxx.xxx.xxx.xxx';

select * from cloudfront_logs where request_ip = 'xxx.xxx.xxx.xxx' and status = 504;

select * from cloudfront_logs where request_ip = 'xxx.xxx.xxx.xxx' and "date" BETWEEN DATE '2022-03-28' AND DATE '2022-03-30' and status = 500;
```
