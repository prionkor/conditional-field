class ConditionalField {
  constructor(args){
    this.$control = $(args.control);

    if(this.$control.length == 0) return;

    this.args = args;
    this.inputType = this.getInputType();
    this.setVisible(this.inputValue());

    this.onChangeBound = this.onChange.bind(this);
    this.$control.on('change', this.onChangeBound);
  }

  onChange(e) {
    var value = this.inputValue();
    this.setVisible(value);
  }

  setVisible(value) {
    
    let shown = [];
    for(let controlValue in this.args.visibility){
      
      const selectors = Array.isArray(this.args.visibility[controlValue]) ? this.args.visibility[controlValue] : [this.args.visibility[controlValue]];
      if(value === controlValue){
        shown = [...shown, ...selectors];
        $(selectors.join(',')).show();
      }else{
      
        if(shown.length === 0){
          $(selectors.join(',')).hide();
          continue;
        }

        // filter out elements that are already shown
        const res = selectors.filter(item => shown.indexOf(item) === -1);
        $(res.join(',')).hide();
      }
    }
  }

  getInputType() {
    if(this.$control.is('select')){
      return 'select';
    }else if(this.$control.is(':radio')){
      return 'radio';
    }else if(this.$control.is(':checkbox')){
      return 'checkbox';
    }
  }

  inputValue() {
    let value = '';
    switch(this.inputType){
      case 'checkbox':
        value = this.$control.is(':checked') ? 'on' : 'off';
        break;
      case 'radio':
        value = this.$control.filter(':checked').val();
        break;
      default:
        value = this.$control.val();
    }
    return value;
  }

  destroy() {
    this.$control.off('change', this.onChangeBound);
  }
}