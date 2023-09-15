# Jinja

> Create a list of your items from a results dict

```jinja
[ \{\% for result in mount_points.results -%}'\{\{ result.stdout \}\}',\{\%- endfor -\%\} ]
```

> Another way to achieve this is through the map() filter, because then you can do further things like remove dupes:

```jinja
"[ \{\{ mount_points.results|map(attribute='stdout')|join(', ') }} ]"
```
