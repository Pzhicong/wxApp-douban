var functions = require('../functions.js')
var url = 'https://api.douban.com/v2/movie/coming_soon'
var pageSize = 20
Page({
  data: {
    films: [],
    hasMore: true,
    showLoading: true,
    loadMoreLoading: false,
    start: 0,
    pageSize: 20,
    isLoading: false
  },
  onPullDownRefresh: function () {
  },
  scroll: function(e){
    //console.log(e)
  },
  onLoad: function () {
    var that = this
    functions.getCity(function(city){
      functions.fetchFilms.call(that, url, city, 0, pageSize, function(data){
        that.setData({
          showLoading: false
        })
      })
    })
  },
  loadMore: function(){
    var that = this;
    if (!this.data.hasMore || this.data.isLoading) {
      return;
    }
    this.setData({isLoading: true});
    functions.getCity(function(city){
      that.setData({
        loadMoreLoading: true
      })
      functions.fetchFilms.call(that, url, city, that.data.start, pageSize, function(data){
        that.setData({
          loadMoreLoading: false
        })
      })
    })
  },
  viewDetail: function(e){
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../detail/detail?id=' + ds.id + '&title=' + ds.title + '&type=coming'
    })
  }
})
