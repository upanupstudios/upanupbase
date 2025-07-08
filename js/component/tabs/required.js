(function (Drupal, once) {
  function tabsRequirements(context) {
    // Find each static tab, update the ID
    const staticTabs = once('static-tabs-required', '.tabs-component[data-tab-type=static]', context);
    if (!staticTabs.length) return;

    staticTabs.forEach(function(staticTab, index) {
      staticTab.setAttribute('id', 'static-tabs--' + index);

      const staticTabID = staticTab.getAttribute('id');

      const needsAttrs = staticTab.querySelectorAll(
        '[id*="TABIDPLACEHOLDER"], [aria-controls*="TABIDPLACEHOLDER"], [aria-labelledby*="TABIDPLACEHOLDER"]'
      );

      needsAttrs.forEach(needsAttr => {
        const id = needsAttr.getAttribute('id');
        const ariaControls = needsAttr.getAttribute('aria-controls');
        const ariaLabelledby = needsAttr.getAttribute('aria-labelledby');

        if (id && id.includes('TABIDPLACEHOLDER')) {
          needsAttr.setAttribute('id', id.replace(/TABIDPLACEHOLDER/g, staticTabID));
        }
        if (ariaControls && ariaControls.includes('TABIDPLACEHOLDER')) {
          const newAriaControls = ariaControls.replace(/TABIDPLACEHOLDER/g, staticTabID);
          needsAttr.setAttribute('aria-controls', newAriaControls);
          needsAttr.setAttribute('href', newAriaControls);
        }
        if (ariaLabelledby && ariaLabelledby.includes('TABIDPLACEHOLDER')) {
          needsAttr.setAttribute('aria-labelledby', ariaLabelledby.replace(/TABIDPLACEHOLDER/g, staticTabID));
        }
      });
    });
  }

  Drupal.behaviors.static_tabs_required = {
    attach: function (context) {
      tabsRequirements(context);
    }
  };
})(Drupal, once);
