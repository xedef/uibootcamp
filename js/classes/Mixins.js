
var Social = Object.create(null);

Social.share = function(friendName){
  return 'Sharing ' + this.get('title') + ' with ' + friendName;
};

Social.like = function(){
  return 'I like ' + this.get('title');
};