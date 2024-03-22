function tabsRequirements() {

  // Find each static tab, update the ID
  const staticTabs = document.querySelectorAll('.tabs-component[data-tab-type=static]:not([data-tab-id-added=true])');
  if(!staticTabs.length) return;

  // Find elements within each static tab, replace TABIDPLACEHOLDER with new ID from tab
  staticTabs.forEach(function(staticTab, index) {
    staticTab.setAttribute('id','static-tabs--' + index);
    staticTab.setAttribute('data-tab-id-added',true);

    const staticTabID = staticTab.getAttribute('id');

    const needsAttrs = staticTab.querySelectorAll('[id*="TABIDPLACEHOLDER"], [aria-controls*="TABIDPLACEHOLDER"], [aria-labelledby*="TABIDPLACEHOLDER"]');

    
    needsAttrs.forEach(needsAttr => {
      const id = needsAttr.getAttribute('id');
      const ariaControls = needsAttr.getAttribute('aria-controls');
      const ariaLabelledby = needsAttr.getAttribute('aria-labelledby');
      
      if (id && id.includes('TABIDPLACEHOLDER')) {
        const newId = id.replace(/TABIDPLACEHOLDER/g, staticTabID);
        needsAttr.setAttribute('id', newId);
      }
      let newAriaControls;
      if (ariaControls && ariaControls.includes('TABIDPLACEHOLDER')) {
        newAriaControls = ariaControls.replace(/TABIDPLACEHOLDER/g, staticTabID);
        needsAttr.setAttribute('aria-controls', newAriaControls);
        needsAttr.setAttribute('href', newAriaControls);
      }
      
      if (ariaLabelledby && ariaLabelledby.includes('TABIDPLACEHOLDER')) {
        const newAriaLabelledby = ariaLabelledby.replace(/TABIDPLACEHOLDER/g, staticTabID);
        needsAttr.setAttribute('aria-labelledby', newAriaLabelledby);
      }
    });
  });
  
}

(function ($, Drupal)
{
  Drupal.behaviors.static_tabs_required = {
    attach: function (context, settings)
    {
      setTimeout(tabsRequirements(),100);
    }
  };
}(jQuery, Drupal));