const layoutConfig = require('../../../config/layout');

module.exports = class BaseController {
  constructor() {
    this.res = null;
    this.req = null;
    this.layout = layoutConfig.defaultLayout;
  }

  send(template, data) {
    if (this.api) return this.res.end(JSON.stringify(data));

    this.res.end(this.view(template, data));
  }

  view(template, data) {
    try {
      template = template.replace('.', '/');
      const layoutString = require(`../../../resources/views/layouts/${this.layout}`);
      const htmlString = require(`../../../resources/views/${template}`);
      return layoutString(htmlString(data));
    } catch (e) {
      return `Something went wrong: ${e.message}`;
    }
  }
};
