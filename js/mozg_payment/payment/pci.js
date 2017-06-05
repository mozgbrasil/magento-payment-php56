/**
 * Copyright © 2016 Mozg. All rights reserved.
 * See LICENSE.txt for license details.
 */

//-

//-

// https://gist.github.com/suprememoocow/2823600

// Fix: Cielo Clear Fiels Credit Card

(function(XHR) {
    "use strict";
    
    var stats = [];
    var timeoutId = null;
    
    var open = XHR.prototype.open;
    var send = XHR.prototype.send;
    
    XHR.prototype.open = function(method, url, async, user, pass) {
        this._url = url;
        open.call(this, method, url, async, user, pass);
    };
    
    XHR.prototype.send = function(data) {
        var self = this;
        var start;
        var oldOnReadyStateChange;
        var url = this._url;
        
        function onReadyStateChange() {
            if(self.readyState == 4 /* complete */) {
                var time = new Date() - start;                
                stats.push({
                    url: url,
                    duration: time                    
                });

                //console.log(self);

                try {
                    var json = eval("(" + self.response + ')');
                } catch (exception) {
                    //It's advisable to always catch an exception since eval() is a javascript executor...
                    var json = null;
                }

                //console.log(json);

                if (!json) {
                    //this is not json
                    return false;
                }

                //

                var error_return = false;

                if(json.error){
                    // Checkout Nativo - {"success":false,"error":true,"error_messages":"message"}
                    // IWD_Opc - {"error":"message","redirect":"http:"}
                    var error_return = (json.error != "undefined");
                    console.log('json.error: ' + error_return);
                }
                if(json.success){
                    // Inovarti_Onestepcheckout - 
                    var error_return = (json.success == false);
                    console.log('json.success: ' + error_return);
                }
                
                if (error_return){

                    console.log('FIX PCI');

                    // 1

                    checkout.gotoSection('payment');

                    // 2

                    // http://www.w3schools.com/jsref/coll_form_elements.asp
                    var myForm = document.getElementById("co-payment-form");
                    //console.log(myForm);
                    if(!myForm){
                        var myForm = document.getElementById("onestepcheckout-general-form");
                    }
                    //console.log(myForm);
                    var i;
                    for (i = 0; i < myForm.length; i++) {
                        if(myForm.elements[i].type == 'text'){
                            //console.log(myForm.elements[i]);
                            //console.log(myForm.elements[i].type);
                            //console.log(myForm.elements[i].value);
                            myForm.elements[i].value = '';
                        }            
                    }


                }
                
                /*if(!timeoutId) {
                    timeoutId = window.setTimeout(function() {
                        var xhr = new XHR();
                        xhr.noIntercept = true;
                        xhr.open("POST", "/clientAjaxStats", true);
                        xhr.setRequestHeader("Content-type","application/json");
                        xhr.send(JSON.stringify({ stats: stats } ));                        
                        
                        timeoutId = null;
                        stats = []; 
                    }, 2000);
                }*/           
            }
            
            if(oldOnReadyStateChange) {
                oldOnReadyStateChange();
            }
        }
        
        if(!this.noIntercept) {
            start = new Date();
            
            if(this.addEventListener) {
                this.addEventListener("readystatechange", onReadyStateChange, false);
            } else {
                oldOnReadyStateChange = this.onreadystatechange; 
                this.onreadystatechange = onReadyStateChange;
            }
        }
        
        send.call(this, data);
    }
})(XMLHttpRequest);

//-

console.log(this);

//-