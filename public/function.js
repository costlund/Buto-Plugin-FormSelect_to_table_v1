/**
 * Transform a selectbox to datatable in a Bootstrap modal window.
 * In datatable one could search items in a way that is not possible in a selectbox.
 * Add function.js and call init function.
 * Require twitter/bootstrap335v.
 */
function PluginFormSelect_to_table_v1(){
  /**
   * Data.
   */
  this.data = {id: null, label: null, columns: null}
  this.link_innerHTML = "&nbsp;";
  /**
   * Example: PluginFormSelect_to_table_v1.init('frm_inherit_memb_account_id', PluginI18nJson_v1.i18n('Email')+','+PluginI18nJson_v1.i18n('Name'), PluginI18nJson_v1.i18n('Member'));
   */
  this.init = function(id, columns, label){
    var select = document.getElementById(id);
    if(select == null){
      alert('PluginFormSelect_to_table_v1 says: Element with id '+id+' is not in the dom.');
      return null;
    }
    /**
     * Link.
     */
    var text = this.link_innerHTML;
    if(select.options[select.selectedIndex].text){
      text = select.options[select.selectedIndex].text;
    }
    var element = [
      {type: 'a', innerHTML: [
          {type: 'div', innerHTML: [
              {type: 'span', attribute: {class: 'glyphicon glyphicon-triangle-right', style: 'float:right'}},
              {type: 'span', innerHTML: text.replace(':', ', '), attribute: {id: 'link_'+id}}
          ], attribute: {class: 'well', style: 'padding:10px'}}
      ], attribute: {href: '#', onclick: "PluginFormSelect_to_table_v1.click({id: '"+id+"', columns: '"+columns+"', label: '"+label+"'});"}}
    ];
    PluginWfDom.render(element, document.getElementById('div_'+id));
    /**
     * Hide current select.
     */
    select.style.display='none';
  }
  this.click = function(data){
    this.data = data;
    PluginWfBootstrapjs.modal({id: 'select_to_table', urlzzz: '/select_to_table/render', content: '', lable: this.data.label, size: 'lg', fade: false})
    var element = [
      {type: 'table', innerHTML: [
          {type: 'thead', innerHTML: '', attribute: {id: 'thead_select_to_table'}},
          {type: 'tbody', innerHTML: '', attribute: {id: 'tbody_select_to_table'}}
        ], attribute: {class: 'table table-hover', id: 'table_select_to_table'}},
      {type: 'script', innerHTML: 'PluginFormSelect_to_table_v1.add_table_data()'},
      {type: 'script', innerHTML: 'PluginFormSelect_to_table_v1.do_datatable()'}
    ];
    PluginWfDom.render(element, document.getElementById('select_to_table_body'));
  }
  this.do_datatable = function(){
    var datatable_table_account_list; 
    $(document).ready(function(){ 
      var data = {
        paging: true,
        ordering: true,
        info: true,
        searching: true,
        order: [[0,'asc']],
        language: {url: "/plugin/datatable/datatable_1_10_16/i18n/Swedish.json"}
      };
      
      datatable_table_account_list = $('#table_select_to_table').DataTable(data);
    });
    
  }
  this.add_table_data = function(){
    /**
     * thead
     */
    var th = [];
    var columns = this.data.columns.split(',');
    for(var i=0; i<columns.length;i++){
      th[i] = {type: 'td', innerHTML: columns[i]};
    }
    var tr = [{type: 'tr', innerHTML: th}];
    PluginWfDom.render(tr, document.getElementById('thead_select_to_table'));
    var select = document.getElementById(this.data.id);
    /**
     * tbody
     */
    for(var i=0;i<select.length;i++){
      var font_weight = '';
      if(select.options[select.selectedIndex].text == select.options[i].text){
        font_weight = 'font-weight:bold';
      }
      var split = select.options[i].text.split(':');
      var td = [];
      for(var j=0; j<columns.length;j++){
        td[j] = {type: 'td', innerHTML: split[j], attribute: {style: font_weight}};
      }
      var tr = [{type: 'tr', innerHTML: td, attribute: {onclick: "PluginFormSelect_to_table_v1.table_click(this.getAttribute('data-id'));", "data-id": i}}];
      PluginWfDom.render(tr, document.getElementById('tbody_select_to_table'));
    }
  }
  this.table_click = function(selectedIndex){
    var select = document.getElementById(this.data.id);
    /**
     * Close modal.
     */
    $("#select_to_table").modal('hide');
    /**
     * Select item in hidden selectbox.
     */
    select.selectedIndex = selectedIndex;
    /**
     * Set text in element from hidden selectbox option.
     */
    var text = this.link_innerHTML;
    if(select.options[select.selectedIndex].text){
      text = select.options[select.selectedIndex].text;
    }
    document.getElementById('link_'+this.data.id).innerHTML=text.replace(/:/g, ', ');
  }
  
}
var PluginFormSelect_to_table_v1 = new PluginFormSelect_to_table_v1();

