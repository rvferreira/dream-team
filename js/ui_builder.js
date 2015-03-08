var twitter = {};
/*twitter[1] = "487124711038402560";
twitter[5] = "http://4.bp.blogspot.com/-zsbDeAUd8aY/US7F0ta5d9I/AAAAAAAAEKY/UL2AAhHj6J8/s1600/facebook-default-no-profile-pic.jpg";*/

/* Design constants */
ASPECT_RATIO = 16 / 9;
HEADER_PERCENT_HEIGHT = 10 / 100;
FOOTER_PERCENT_HEIGHT = 14 / 100;
ACTION_BUTTON_PERCENT_WIDTH = 39 / 100;
LOGO_PERCENT_HEIGHT = 19 / 100;
PROFILE_PICTURE_SIZE = 25 / 100;

/* Global Useful variables */
var ws;
var pageWidth,
    pageHeight;
var workSpaceWidth,
    workspaceHeight;
var tweet_left_position;
var actualSentiment;
var waitingTweetFlag = 0;
var actual_twit = 3;

/* Actual Tweet Info */
var id;
var text;
var sentiment;
var username;
var picUrl;

var twit = {};
twit[0] = "493795487003054080::I CANNOT belive @mariobrofood discontinued this dish - YOU JUST LOST a customer::negative::clrssdz::https://pbs.twimg.com/profile_images/493792472871354368/IYDs43Bd.jpeg";
twit[1] = "493795555097604096::@Mariobrofood, no more #vegan lasagna? I'm gonna eat lunch somewhere else - HATE YOU! #ew::negative::clrssdz::https://pbs.twimg.com/profile_images/493792472871354368/IYDs43Bd.jpeg";
twit[2] = "493795631165493251::@mariobrofood I love you anyway::positive::clrssdz::https://pbs.twimg.com/profile_images/493792472871354368/IYDs43Bd.jpeg";


function turnReplyOn() {
    var $lefty = $("#reply");
    $lefty.animate({
        right: parseInt(0)
    });
}

function turnReplyOff() {
    var $righty = $("#reply");
    $righty.animate({
        right: parseInt(-$righty.width() - 2)
    });
}

function retweet() {
    ws.send("retweet::" + id);
}

function updateTweetDiv() {
    $("#tweet").empty();

    id = twitter[1];
    username = twitter[4];

    if (twitter[3] != sentiment) {
        sentiment = twitter[3];

        if (sentiment == "negative") {
            turnReplyOn();
        }
        else {
            turnReplyOff();
        }
    }

    if (sentiment == "negative") {
        var reviewText = document.createElement("div");
        reviewText.innerHTML = "Unsatisfied Customer! You probably want to reply it."
        reviewText.id = "badReview";
        $("#tweet").prepend(reviewText);
    }
    else {
        var reviewText = document.createElement("div");
        reviewText.innerHTML = "Congratulations! A nice review that could be shared."
        reviewText.id = "niceReview";
        $("#tweet").prepend(reviewText);
    }

    
    picUrl = twitter[5];
    var usrPic = document.createElement("img");
    usrPic.id = "userPicture";
    usrPic.src = picUrl;
    usrPic.align = "middle";
    usrPic.width = PROFILE_PICTURE_SIZE * $("#tweet").width();
    usrPic.height = PROFILE_PICTURE_SIZE * $("#tweet").width();
    $("#tweet").append(usrPic);
    
    var usrName = document.createElement("span");
    usrName.innerHTML = username;
    usrName.id = "usrName";
    $("#tweet").append(usrName);
    $("#tweet").append(document.createElement("br"));
    $("#tweet").append(document.createElement("p"));

    text = twitter[2];
    var twText = document.createElement("div");
    twText.innerHTML = text;
    $("#tweet").append(twText);
}

function getPreviousTweet() {
    waitingTweetFlag = 1;
    actual_twit--;
    if (actual_twit < 0) actual_twit = 2;
    checkoutInfointoTwitterVariable(twit[actual_twit]);
    //ws.send("getPrevTweet");

    /*
    twitter[2] = "texttext text texttext text texttext text ";
    twitter[3] = "negative";
    twitter[4] = "BadUser"

    updateTweetDiv();

    */
}

function getNextTweet() {
    waitingTweetFlag = 1;
    actual_twit++;
    if (actual_twit > 2) actual_twit = 0;
    checkoutInfointoTwitterVariable(twit[actual_twit]);
    //ws.send("getNextTweet");

    /*
    twitter[2] = "posit texttext text posi texttext text ";
    twitter[3] = "positive";
    twitter[4] = "NiceUser"

    updateTweetDiv();

    */

}

function reply(message) {
    ws.send("reply::" + id + "::" + message + "::" + username);
}

function callReplyPopUp() {
    var $lefty = $("#replyPopUp");
    $lefty.animate({
        left: 0
    });
}

function replyPopUpInit() {
    $("#replyPopUp").css({
        left: function () {
            return ($("#workspace").width() + 2);
        },
        top: function () {
            return ($("#header").height());
        }
    });
    
    $("#cancelReply").click(function () {
        var $righty = $("#replyPopUp");
        $righty.animate({
            left: parseInt($("#workspace").width() + 2)
        }, function () {
            document.getElementById("answerInput").value = "Your answer goes here.";
        });
    });

    $("#submitReply").click(function () {
        var message = document.getElementById("answerInput").value;
        if (message) reply(message);
        var $righty = $("#replyPopUp");
        $righty.animate({
            left: parseInt($("#workspace").width() + 2)
        }, function () {
            document.getElementById("answerInput").value = "Your answer goes here.";
        });
    });

    $("#cancelWrapper").css({
        left: function () {
            return (($("#workspace").width() / 2 - $("#cancelWrapper").width()) / 2);
        },
        top: function () {
            return (($("#cancelReply").height() - $("#cancelWrapper").height()) / 2);
        }
    });

    $("#submitWrapper").css({
        left: function () {
            return (($("#workspace").width() / 2 - $("#submitWrapper").width()) / 2);
        },
        top: function () {
            return (($("#submitReply").height() - $("#submitWrapper").height()) / 2);
        }
    });
}

function navigationButtonsInit() {

    var navImgWidth = ($("#content").width() - $("#tweet").width()) / 2.5;

    $(".nav_img").css({
        width: function () {
            return (navImgWidth);
        },
    });

    $(".navigation").css({
        top: function () {
            return (($("#content").height() - (navImgWidth * 2.65)) / 2);
        },
    });

    $("#previous").css({
        left: function () {
            return (($("#content").width() - $("#tweet").width() - 2 * navImgWidth) / 4);
        }
    });

    $("#previous").click(function () {
        var $lefty = $("#tweet");
        $lefty.animate({
            left: parseInt($("#content").width())
        }, function () {
            getPreviousTweet();
            $("#tweet").css({
                left: function () {
                    return (-$lefty.width());
                }
            });
        });
        $lefty.animate({
            left: tweet_left_position
        });
    });

    $("#next").css({
        right: function () {
            return (($("#content").width() - $("#tweet").width() - 2 * navImgWidth) / 4);
        }
    });

    $("#next").click(function () {
        var $righty = $("#tweet");
        $righty.animate({
            left: parseInt(-$righty.width())
        }, function () {
            getNextTweet();
            $("#tweet").css({
                left: function () {
                    return ($("#content").width());
                }
            });
        });
        $righty.animate({
            left: tweet_left_position
        });
    });

    $("#next").click();
}

function contentInit() {
    $("#content").css({
        top: function () {
            return ($("#header").height());
        },
        height: function () {
            return (workspaceHeight - $("#header").height() - $("#footer").height());
        }
    });

    var internalSize;

    $("#tweet").css({
        top: function () {
            return (($("#content").height() - $(this).height()) / 2);
        },
        left: function () {
            tweet_left_position = ($("#content").width() - $(this).width()) / 2;
            return (tweet_left_position);
        },
        fontSize: function () {
            internalSize = $(this).height() / 30;
            return internalSize;
        }
    });

    $("#tweet > *").css("margin", internalSize + "px");

    navigationButtonsInit();
    replyPopUpInit();
}

function replyButtonInit() {
    var replyWidth = workSpaceWidth * ACTION_BUTTON_PERCENT_WIDTH;

    $("#reply").css({
        right: function () {
            return (-replyWidth);
        },
        width: function () {
            return (replyWidth);
        }
    });

    $("#replyText").css({
        top: function () {
            return (($("#reply").height() - $(this).height()) / 2);
        },
        left: function () {
            return (($("#reply").width() - $(this).width()) / 2);
        }
    });

    $("#reply").click(function () {
        callReplyPopUp();
    });
}

function retweetButtonInit() {
    var retweetWidth = workSpaceWidth * ACTION_BUTTON_PERCENT_WIDTH;

    $("#retweet").css({
        right: function () {
            return (0);
        },
        width: function () {
            return (retweetWidth);
        }
    });

    $("#retweetText").css({
        top: function () {
            return (($("#retweet").height() - $(this).height()) / 2);
        },
        left: function () {
            return (($("#retweet").width() - $(this).width()) / 2);
        }
    });

    $("#retweet").click(function () {
        retweet();
    });
}

function insertLogo() {
    var logo = document.createElement("img");
    logo.src = "./img/logo.png";
    logo.id = "logo";

    $("#workspace").append(logo);

    $("#logo").css({
        height: function () {
            return (LOGO_PERCENT_HEIGHT * workspaceHeight);
        },
    });
}

function footerInit() {
    $("#footer").css({
        height: function () {
            return (workspaceHeight * FOOTER_PERCENT_HEIGHT);
        },
    });
    insertLogo();
    retweetButtonInit();
    replyButtonInit();
}

function headerInit() {
    $("#header").css({
        height: function () {
            return (workspaceHeight * HEADER_PERCENT_HEIGHT);
        }
    });

    $("#title").css({
        top: function () {
            return (((workspaceHeight * HEADER_PERCENT_HEIGHT) - $(this).height()) / 2);
        },
        left: function () {
            return (($("#header").width() - $(this).width() - 1 * $("#header").height()) / 2);
        }
    });
}

function workspaceInit() {
    if ((pageHeight / pageWidth) > ASPECT_RATIO) {
        workSpaceWidth = pageWidth;
        workspaceHeight = workSpaceWidth * ASPECT_RATIO;
    }
    else {
        workspaceHeight = pageHeight;
        workSpaceWidth = workspaceHeight / ASPECT_RATIO;
    }

    $("#workspace").css({
        height: function () {
            return workspaceHeight;
        },
        width: function() {
            return workSpaceWidth;
        },
        left: function () {
            return ((pageWidth - workSpaceWidth) / 2);
        }
    });

    $("#leftCover").css({
        left: 0,
        width: function () {
            return ((pageWidth - workSpaceWidth) / 2);
        }
    });

    $("#rightCover").css({
        right: 0,
        width: function () {
            return ((pageWidth - workSpaceWidth) / 2);
        }
    });
}

function setUIVariables() {
    pageHeight = window.innerHeight;
    pageWidth = window.innerWidth;
}

function checkoutInfointoTwitterVariable(received_msg) {
    var index = received_msg.search("::");

    twitter[1] = received_msg.substr(0, index);
    received_msg = received_msg.substring(index + 2);
    index = received_msg.search("::");

    twitter[2] = received_msg.substr(0, index);
    received_msg = received_msg.substring(index + 2);
    index = received_msg.search("::");

    twitter[3] = received_msg.substr(0, index);
    received_msg = received_msg.substring(index + 2);
    index = received_msg.search("::");

    twitter[4] = received_msg.substr(0, index);
    received_msg = received_msg.substring(index + 2);

    twitter[5] = received_msg;

    updateTweetDiv();
}

function layoutInit() {
    ws = new WebSocket("ws://localhost:9999");
    /*ws.onmessage = function (evt) {
        var received_msg = evt.data;
        console.log(received_msg);
        
        if (waitingTweetFlag) {
            waitingTweetFlag = 0;
            checkoutInfointoTwitterVariable(received_msg);
        }
    };*/

    setUIVariables();
    workspaceInit();
    headerInit();
    footerInit();
    contentInit();
}