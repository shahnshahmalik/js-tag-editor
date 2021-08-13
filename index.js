class TagEdit {

  constructor(container, closeBtnHtml, inputEl) {
    this.inputEl = inputEl;
    this.container = document.getElementById(container);
    this.container.classList.add('tag-edit-main');
    this.container.childNodes.forEach(cn => {
      if (cn && cn.tagName && cn.tagName.toLowerCase() === 'input') {
        cn.classList.add('tag-edit-input');
      }
    });
    this.closeBtnHtml = closeBtnHtml;
    this.tagsList = [];
    console.log('Tag Editor Ready!');
  }

  /**
   * method to create tag item
   * @param {string} tagName
   * @param {string} closeIconHtml
   * @returns element
   */
  createTagItem = (tagName, closeIconHtml = null) => {
    const outer = document.createElement('div');
    outer.classList.add('tag-item');
    outer.id = `_${tagName}`;

    const tag = document.createElement('span');
    tag.classList.add('tag-span');
    tag.innerHTML = tagName;

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('tag-close-button');
    closeBtn.innerHTML = closeIconHtml;
    closeBtn.id = `@_${tagName}`;

    if(closeBtn.children[0]) {
      const closeIcon = closeBtn.children[0];
      closeIcon.id = `@child_${tagName}`;
      closeIcon.onclick = (event) => {
        const tagName = event.target.id.replace('@child_', '');
        this.removeTagById(tagName);
      };
    }
    
    closeBtn.onclick = (event) => {
      const tagName = event.target.id.replace('@_', '');
        this.removeTagById(tagName);
    };

    outer.appendChild(tag);
    outer.appendChild(closeBtn);

    return outer;
  };

  /**
   * method to create a tag element and prepend it to the container
   * @param {string} tagName 
   * @returns void
   */
  createTag = (tagNames) => {
    if (!tagNames?.length) { return; }
    if(Array.isArray(tagNames)) {
      tagNames.map((name) => {
        this.inputEl.before(this.createTagItem(name, this.closeBtnHtml))
      });
    }
  };

  /**
   * method to add a single tag
   * @param {string} tagName 
   * @returns void
   */
  addTag(tagName) {
    if (!tagName) { return; }

    this.addIfUniqueTag(tagName).then((tags) => {
      this.addTags(tags);
    });
  }

  /**
   * method to add multiple tag
   * could be a comma separated string or an array
   */
  addTags(tagsList) {
    this.removeAllTags().then(() => {
      this.createTag(tagsList);
    });
  }

  /**
   * check if the tag being added is unique
   * add unique tags to a global list and return 
   * the specific check value
   * @param {string} tagName 
   * @returns boolean
   */
  addIfUniqueTag(tagName) {
    return new Promise((resolve, reject) => {
      if (!this.tagsList.find((tag) => tag === tagName)) {
        this.tagsList.push(tagName);
        resolve([...this.tagsList]);
      }
  
     reject(null);
    })
    
  }

  removeTagById(tagName) {
    if(!tagName) { throw new Error('Id not found')}

    this.tagsList.splice(this.tagsList.findIndex((tag) => tag === tagName), 1);
    const elRef = document.getElementById(`_${tagName}`);

    if (elRef) {
      elRef.remove();
    }

    this.addTags(this.tagsList);
  }

  removeAllTags() {
    return new Promise((resolve, reject) => {
      try {
        this.tagsList.map((tag) => {
          const elRef = document.getElementById(`_${tag}`);
          if (tag && elRef) {
            elRef.remove();
          }
        });
      } catch (error) {
        reject(false);
      }
      resolve(true);
    });
  }

  /**
   * edit latest added tag from the list
   * Still TODO
   editLastTag = () => {
    let tagToModify = this.inputEl.innerHTML;

    if (this.tagsList?.length && !tagToModify) {
      const tag = this.tagsList[this.tagsList.length - 1];

      this.tagsList.splice(this.tagsList.length - 1, 1);
      this.removeTagById(tag);
      this.inputEl.value = tag;
      tagToModify = tag;

      setTimeout(() => {
        this.addTags(this.tagsList);
      }, 0);
    }
  }
 */
}

module.exports.TagEditor = TagEdit;