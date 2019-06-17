<?php
class PluginFormSelect_to_table_v1{
  /**
   * Include javascript file.
   */
  public static function widget_include(){
    $element = array();
    wfPlugin::enable('include/js');
    $element[] = wfDocument::createWidget('include/js', 'include', array('src' => '/plugin/form/select_to_table_v1/function.js'));    
    wfDocument::renderElement($element);
  }
}