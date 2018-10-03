import {Component, OnInit} from '@angular/core';
import {TagCategory, TagCategorySelect} from '../tagCategory';
import {TagDatabaseService} from '../tag-database.service';

@Component({
  selector: 'app-tag-manager',
  templateUrl: './tag-manager.component.html',
  styleUrls: ['./tag-manager.component.scss']
})
export class TagManagerComponent implements OnInit {

  past1: string;
  past2: string;
  limit: number;

  limitedTags: string;
  results: string;

  tagCategories: TagCategory[];
  tagCategorySelects: TagCategorySelect[] = [];

  // Handlers /////////
  onButton() {
    this.generateTags();
  }

  // Bound Methods //////////

  generateTags(): void {
    let tags: string[];
    const pastTags = this.past1 + ' ' + this.past2;
    const overused = this.getDuplicates(this.getTags(pastTags));
    this.limitedTags = this.stringArrayToString(overused);

    // Get all the tags based on the selected category
    tags = this.getTagsByCategorySelected();

    // Exclude overused tags
    tags = this.excludeTags(tags, overused);

    // Shuffle and Prune tags
    tags = this.shuffleAndPrune(tags, this.limit);

    this.results = this.stringArrayToString(tags);
  }

  getTagsByCategorySelected(): string[] {
    let tags = '';
    for (const tagCategorySelect of this.tagCategorySelects) {
      if (tagCategorySelect.selected) {
        tags += this.tagCategories.filter(function (obj) {
          return obj.id === tagCategorySelect.id;
        })[0].tags;
      }
    }

    return this.getTags(tags);
  }

  getTagCategories(): void {
    this.tagDatabaseService.getTagCategories()
      .subscribe(tagCategories => this.tagCategories = tagCategories, err => {
      }, () => {
        for (const i in this.tagCategories) {
          this.tagCategorySelects.push({
            id: this.tagCategories[i].id,
            selected: false
          });
        }
      });
  }

  // General Methods ///////////
  getTags(tagString: string): string[] {
    const delimeterReg = /([\W])/g;
    const splits = tagString.split(delimeterReg);
    const tags = [];

    for (const i in splits) {
      if (splits[i].includes('#') && splits[+i + 1] && !delimeterReg.test(splits[+i + 1])) {
        tags.push(splits[i] + splits[+i + 1]);
      }
    }

    return tags;
  }

  getDuplicates(tags: string[]): string[] {
    let duplicates = [], tempObj = {};

    tempObj = this.getCountObject(tags);

    for (const k in tempObj) {
      if (tempObj[k] > 1) {
        duplicates.push(k);
      }
    }

    return duplicates;
  }

  removeDuplicates(tags: string[]): string[] {
    let sanitized = [], tempObj = {};

    tempObj = this.getCountObject(tags);

    for (const k in tempObj) {
      sanitized.push(k);
    }

    return sanitized;
  }

  excludeTags(tags: string[], exclude: string[]): string[] {
    let sanitized = [], tempObj = {};

    tempObj = this.getCountObject(tags);

    for (const i in exclude) {
      if (tempObj[exclude[i]]) {
        tempObj[exclude[i]] = 0;
      }
    }

    for (const k in tempObj) {
      if (tempObj[k] > 0) {
        sanitized.push(k);
      }
    }

    return sanitized;
  }

  getCountObject(tags: string[]): object {
    const tempObj = {};

    for (const i in tags) {
      if (tempObj[tags[i]]) {
        tempObj[tags[i]] += 1;
      } else {
        tempObj[tags[i]] = 1;
      }
    }

    return tempObj;
  }

  stringArrayToString(arr: string[]): string {
    let str = '';

    for (const i in arr) {
      str += arr[i] + ' ';
    }

    return str;
  }

  shuffleAndPrune(tags: string[], limit: number): string[] {
    let index = tags.length, temp, r, out = [];

    while (0 !== index) {
      r = Math.floor(Math.random() * index);
      index -= 1;

      temp = tags[index];
      tags[index] = tags[r];
      tags[r] = temp;
    }

    if (limit < tags.length) {
      for (let i = 0; i < limit; i++) {
        out.push(tags[i]);
      }
    } else {
      out = tags;
    }

    return out;
  }

  constructor(private tagDatabaseService: TagDatabaseService) {
  }

  ngOnInit() {
    this.getTagCategories();
  }

}
