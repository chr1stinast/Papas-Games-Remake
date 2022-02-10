class SubmissionMenu { 
    constructor({ caster, enemy, onComplete, items }) {
      this.caster = caster;
      this.enemy = enemy;
      this.onComplete = onComplete;
  
      let quantityMap = {};
      items.forEach(item => {
        let existing = quantityMap[item.actionId];
        if (existing) {
        existing.quantity += 1;
        } else {
        quantityMap[item.actionId] = {
            actionId: item.actionId,
            quantity: 1,
            instanceId: item.instanceId,
        }
        }
      })
      this.items = Object.values(quantityMap);
    }
  
    getPages() {
  
      // const backOption = {
      //   label: "Go Back",
      //   description: "Return to previous page",
      //   handler: () => {
      //     this.keyboardMenu.setOptions(this.getPages().root)
      //   }
      // };
  
      return {
        root: [
            this.caster.actions.map(key => {
                const action = Actions[key];
                return {
                  label: action.name,
                  description: action.description,
                  handler: () => {
                    this.menuSubmit(action)
                  }
                }
            })
        ]
      }
    }
  
    menuSubmitReplacement(replacement) {
      this.keyboardMenu?.end();
      this.onComplete({
        replacement
      })
    }
  
    menuSubmit(action, instanceId=null) {
  
      this.keyboardMenu?.end();
  
      this.onComplete({
        action,
        target: action.targetType === "friendly" ? this.caster : this.enemy,
        instanceId
      })
    }
  
    decide() {
      //TODO: Enemies should randomly decide what to do...
      this.menuSubmit(Actions[ this.caster.actions[0] ]);
    }
  
    showMenu(container) {
      this.keyboardMenu = new KeyboardMenu();
      this.keyboardMenu.init(container);
      this.keyboardMenu.setOptions( this.getPages().root )
    }
  
    init(container) {
        // TODO: add a timer to make dialogue decisions, if timer runs out decide automatically
        //Show some UI
        this.showMenu(container)
    }
  }