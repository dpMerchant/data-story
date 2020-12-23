<?php

namespace DataStory\Nodes;

use DataStory\NodeModel;
use DataStory\Parameters\String_;

class Filter extends NodeModel
{
    const IN_PORTS = ['Input'];

    const OUT_PORTS = ['Default'];

    const EDITABLE_OUT_PORTS = true;
    const SHORT_DESCRIPTION  = 'Filter features by attribute values';

    public static function parameters($variation = [])
    {
        return [
            String_::make('node_name')->default('Filter'),
            String_::make('filter_attribute')->default(''),
        ];
    }

    public function run()
    {
        $groups = $this->input()->groupBy(
            $this->getParameter('filter_attribute')
        );
        
        $unmatched = $groups->filter(function($features, $port) {
            // Is unmatched? Keep.
            // dd(
            //     $this->portNamed($port)                
            // );

            if(!$this->portNamed($port)) return true;
            // Else output to explicit port
            
            $this->output($features, $port);    
        });

        $this->output($unmatched, 'Default');

    }
}