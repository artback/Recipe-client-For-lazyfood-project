
// Import the core angular services.
import { Component } from '@angular/core';

// Import the application components and services.
import { TagsInputCoreComponent } from './tags-input-core.component';


@Component({
  selector: 'app-tags-input',
  inputs: [ 'tags' ],
  outputs: ['tagsChangeEvents: tagsChange'],
  styleUrls: [ './tags-input.component.less' ],
  templateUrl: './tags-input.html'
})
export class TagsInputComponent extends TagsInputCoreComponent {
}
