var React = require("react");
var expect = require("expect");
var TestUtils = require('react-addons-test-utils');
var SecondScreen = require('../second-screen/second-screen.jsx');
var $ = require('jquery');

describe('CommitListScreen', function () {    
    it("renders commit text colors correctly", function () {
        var secondscreen = TestUtils.renderIntoDocument(
            <SecondScreen params={{repouser:"nodejs", reponame:"node"}} />
        );
        var sidebarlist = TestUtils.findRenderedDOMComponentWithClass(
            secondscreen, 'side-bar-list'
        );
        var a = { 
            author:{name:"Mark Otto"},
            comments_url : "https://api.github.com/repos/twbs/bootstrap/commits/371bf955754229184d336ee58239b3f4859ce28c/comments",
            commit : {
                author: {name:"Mark Otto"},
                comment_count:0,
                message : "Merge branch 'v4-dev' of https://github.com/twbs/bootstrap into v4-dev",
                url : "https://api.github.com/repos/twbs/bootstrap/git/commits/371bf955754229184d336ee58239b3f4859ce28c"
            },
            html_url : "https://github.com/twbs/bootstrap/commit/371bf955754229184d336ee58239b3f4859ce28c",
            sha : "371bf955754229184d336ee58239b3f4859ce281",
            url : "https://api.github.com/repos/twbs/bootstrap/commits/371bf955754229184d336ee58239b3f4859ce28c" 
        }
        var b = { 
            author:{name:"Mark Otto"},
            comments_url : "https://api.github.com/repos/twbs/bootstrap/commits/371bf955754229184d336ee58239b3f4859ce28c/comments",
            commit : {
                author: {name:"Mark Otto"},
                comment_count:0,
                message : "Merge branch 'v4-dev' of https://github.com/twbs/bootstrap into v4-dev",
                url : "https://api.github.com/repos/twbs/bootstrap/git/commits/371bf955754229184d336ee58239b3f4859ce28c"
            },
            html_url : "https://github.com/twbs/bootstrap/commit/371bf955754229184d336ee58239b3f4859ce28c",
            sha : "371bf955754229184d336ee58239b3f4859ce28c",
            url : "https://api.github.com/repos/twbs/bootstrap/commits/371bf955754229184d336ee58239b3f4859ce28c" 
        }
        secondscreen.setState({recentCommits: [a,b]});
        
        sidebarlist.childNodes.forEach(function(item){
            var commitId = item.textContent
            var textColor = $(item).css("color");
            var finalChar = commitId.slice(-1);
            var isInt = parseInt(finalChar).toString();
            var colorlogic = (isInt==="NaN")?"black":"blue";  
            expect(textColor).toEqual(colorlogic);
        })
    });
});