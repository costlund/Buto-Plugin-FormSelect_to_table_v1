# Buto-Plugin-FormSelect_to_table_v1
Transform a selectbox to datatable in a Bootstrap modal window.


Include function.js via widget.
```
-
  type: widget
  data:
    plugin: form/select_to_table_v1
    method: include
```

Then run this javascript to modify a selectbox. 

In this example we have a selectbox with name of members.

```
PluginFormSelect_to_table_v1.init('_id_of_selectbox_', 'Name', 'Members');
```

One could add columns. In this example we have name and email in the selectbox. Note that option in selectbox must have name and email separated with a colon (:).

```
PluginFormSelect_to_table_v1.init('_id_of_selectbox_', 'Name,Email', 'Members');
```
