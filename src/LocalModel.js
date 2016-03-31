var LocalModel = {
  loadFromLS: function() {
    try {
      var data = localStorage.getItem(this.Key);
      if (data) {
        data = JSON.parse(data);
        if (data.version == this.Version) {
          return data.data;
        }
      }
    }
    catch(err) {}
  },
  saveToLS: function() {
    var data = this.toJSON();
    localStorage.setItem(this.Key, JSON.stringify({
      version: this.Version,
      data: data
    }));
  }
};

export default LocalModel;
