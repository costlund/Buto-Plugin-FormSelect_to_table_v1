<?php
class PluginFormSelect_to_table_v1{
  /**
   * Include javascript file.
   */
  public static function widget_include(){
    $element = array();
    $element[] = wfDocument::createHtmlElement('script', null, array('src' => '/plugin/form/select_to_table_v1/function.js', 'type' => 'text/javascript'));
    wfDocument::renderElement($element);
  }
}