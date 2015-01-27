// lazyload config

angular.module('app')
/**
 * jQuery plugin config use ui-jq directive , config the js and css files that required
 * key: function name of the jQuery plugin
 * value: array of the css js file located
 */
    .constant('JQ_CONFIG', {
        //datarangepicker: ['vendor/jquery/datarangepicker.js'],
        //datepicker: ['vendor/jquery/datepicker/datepicker.css',
        //    'vendor/jquery/datepicker/bootstrap-datepicker.js'],
        //easyPieChart: ['vendor/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
        //sparkline: ['vendor/jquery/charts/sparkline/jquery.sparkline.min.js'],
        //plot: ['vendor/jquery/charts/flot/jquery.flot.min.js',
        //    'vendor/jquery/charts/flot/jquery.flot.resize.js',
        //    'vendor/jquery/charts/flot/jquery.flot.tooltip.min.js',
        //    'vendor/jquery/charts/flot/jquery.flot.spline.js',
        //    'vendor/jquery/charts/flot/jquery.flot.orderBars.js',
        //    'vendor/jquery/charts/flot/jquery.flot.pie.min.js'],
        //slimScroll: ['vendor/jquery/slimscroll/jquery.slimscroll.min.js'],
        //sortable: ['vendor/jquery/sortable/jquery.sortable.js'],
        //nestable: ['vendor/jquery/nestable/jquery.nestable.js',
        //    'vendor/jquery/nestable/nestable.css'],
        //filestyle: ['vendor/jquery/file/bootstrap-filestyle.min.js'],
        //slider: ['vendor/jquery/slider/bootstrap-slider.js',
        //    'vendor/jquery/slider/slider.css'],
        //chosen: ['vendor/jquery/chosen/chosen.jquery.min.js',
        //    'vendor/jquery/chosen/chosen.css'],
        //TouchSpin: ['vendor/jquery/spinner/jquery.bootstrap-touchspin.min.js',
        //    'vendor/jquery/spinner/jquery.bootstrap-touchspin.css'],
        //wysiwyg: ['vendor/jquery/wysiwyg/bootstrap-wysiwyg.js',
        //    'vendor/jquery/wysiwyg/jquery.hotkeys.js'],
        //dataTable: ['vendor/jquery/datatables/jquery.dataTables.min.js',
        //    'vendor/jquery/datatables/dataTables.bootstrap.js',
        //    'vendor/jquery/datatables/dataTables.bootstrap.css',
        //    'vendor/jquery/datatables/dataTables.responsive.js',
        //    'vendor/jquery/datatables/dataTables.responsive.css'],
        //vectorMap: ['vendor/jquery/jvectormap/jquery-jvectormap.min.js',
        //    'vendor/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
        //    'vendor/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
        //    'vendor/jquery/jvectormap/jquery-jvectormap.css'],
        footable: ['lib/footable/dist/footable.all.min.js',
            'lib/footable/css/footable.core.min.css']
    }
);
