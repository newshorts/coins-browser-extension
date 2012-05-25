/*
 *  Run this with:
 *  cfx run --profiledir=/Users/newe1344/Library/Application\ Support/Firefox/Profiles/nt5qjxnu.Development
 *
 **/

var widgets = require('widget');
var tabs = require('tabs');
var self = require('self');

var widget = widgets.Widget({
    id: 'coins-widget',
    label: 'Mario Coins',
    contentURL: 'http://www.mozilla.org/favicon.ico',
    onClick: function() {
        tabs.activeTab.attach({
            contentScriptFile: [self.data.url('jquery.js'), self.data.url('easel.js'), self.data.url('coins.js'), self.data.url('app.js')]
        });
    }
});