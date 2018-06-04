"use strict";

Module.register("MMM-BasketballScores", {
    
    result: {},
    defaults: {
    	uypdateInterval: 600,
    	teams: [],
    	baseURL: "https://api.mysportsfeeds.com/v1.2/pull/nba/2018-playoff/daily_game_schedule.json?fordate=20180521"
    },
    
    start: function() {
    	this.getScores();
    	this.scheduleUpdate();
    },

    getDom: function() {


    },


    
    scheduleUpdate: function(delay) {
		var loadTime = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			loadTime = delay;
		}

		var that = this;
		setInterval(function() {
			that.getScores();
		}, loadTime);
	},



    getScores: function () {
    	var url = this.config.baseURL;
        this.sendSocketNotification("GET_SCORES", url);
    },


    socketNotificationReceived: function(notification, payload) {
		if (notification === "SCORE_RESULT") {
			this.result = payload;
			this.updateDom(self.config.fadeSpeed);
		} 
	}






});