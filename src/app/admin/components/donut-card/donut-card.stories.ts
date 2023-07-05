import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, componentWrapperDecorator } from '@storybook/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { DonutCardComponent } from './donut-card.component';

import { Donut } from '../../models/donut.model';

const meta: Meta<
  DonutCardComponent & { statusText: string; statusType: string }
> = {
  title: 'Components/DonutCardComponent',
  component: DonutCardComponent,
  tags: ['autodocs'],
  decorators: [
    // https://github.com/storybookjs/storybook/tree/next/code/frameworks/angular#modulemetadata-decorator
    // If your component has dependencies on other Angular directives and modules, these can be supplied using the moduleMetadata decorator either for all stories or for individual stories.
    moduleMetadata({
      imports: [RouterTestingModule],
    }),
    componentWrapperDecorator(DonutCardComponent, ({ args }) => {
      const { statusText, statusType, ...otherArgs } = args;
      const status = { text: statusText, type: statusType };
      return {
        ...otherArgs,
        status,
      };
    }),
  ],
};

export default meta;
type Story = StoryObj<
  DonutCardComponent & { statusText: string; statusType: string }
>;

export const Basic: Story = {
  args: {
    statusText: 'foo',
    statusType: 'success',
    donut: {
      id: '1',
      name: 'Caramel swirl',
      icon: 'caramel-swirl',
      price: 500,
      description: 'some kind of donut',
    },
  },
};

export const New: Story = {
  args: {
    donut: {
      ...(Basic.args?.donut as Donut),
      promo: 'new',
    },
  },
};

export const Limited: Story = {
  args: {
    donut: {
      ...(Basic.args?.donut as Donut),
      promo: 'limited',
    },
  },
};

export const AllIcons: StoryObj<DonutCardComponent & { icons: string[] }> = {
  render: (args) => ({
    props: args,
    template: `
      <div>
        <donut-card *ngFor="let icon of icons" [donut]="{
          id: donut.id,
          name: icon,
          icon: icon,
          price: donut.price,
          description: donut.description  }">
        </donut-card>
      </div>`,
  }),
  args: {
    donut: {
      id: '1',
      name: 'Caramel swirl',
      icon: 'caramel-swirl',
      price: 1500,
      description: 'some kind of donut',
    },
    icons: [
      'caramel-swirl',
      'glazed-fudge',
      'just-chocolate',
      'sour-supreme',
      'strawberry-glaze',
      'vanilla-sundae',
      'zesty-lemon',
    ],
  },
};
