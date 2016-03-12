export default {
  componentWillMount() {
    if (this._options.styles) {
      const {serverHooks: {insertCss} = {}} = this.context;

      if (insertCss)
        this._removeCss = insertCss(this._options.styles._getCss());
      else
        this._removeCss = this._options.styles._insertCss();
    }
  },

  componentWillUnmount() {
    if (this._removeCss)
      setTimeout(this._removeCss);
  }
};
