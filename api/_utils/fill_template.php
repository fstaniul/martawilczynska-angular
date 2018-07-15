<?php

function fill_template($replacements, $template) 
{
    return preg_replace_callback('/{{(.+?)}}/', function($matches) use ($replacements) {
        return $replacements[$matches[1]];
    }, $template);
}