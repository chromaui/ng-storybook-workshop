import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { DonutFormComponent } from './donut-form.component';

const meta: Meta<DonutFormComponent> = {
  title: 'Components/DonutFormComponent',
  component: DonutFormComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    }),
  ],
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
  argTypes: {
    create: { action: 'create' },
    update: { action: 'update' },
    delete: { action: 'delete' },
  },
};

export default meta;
type Story = StoryObj<DonutFormComponent>;

export const Loading: Story = {};

export const EditDonut: Story = {
  args: {
    donut: {
      name: 'Old Fashioned',
      icon: 'glazed-fudge',
      price: 200,
      promo: 'limited',
      description: 'some kind of donut',
    },
  },
};

export const NewDonut: Story = {
  args: {
    donut: { name: '', icon: '', price: 0, description: '' },
  },
};

export const WithValidation: Story = {
  ...NewDonut,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByLabelText<HTMLInputElement>(/name/i),
      'Old Fashioned Glazed'
    );

    await userEvent.click(
      canvas.getByRole<HTMLButtonElement>('button', {
        name: /create/i,
      })
    );
  },
};

export const FillForm: Story = {
  ...NewDonut,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByLabelText<HTMLInputElement>(/name/i),
      'Old Fashioned Glazed'
    );
    await userEvent.selectOptions(
      canvas.getByLabelText<HTMLInputElement>(/icon/i),
      '1: glazed-fudge'
    );

    const priceInput = await canvas.findByLabelText<HTMLInputElement>(/price/i);
    await userEvent.clear(priceInput);
    await userEvent.type(priceInput, '500');

    await userEvent.click(canvas.getByLabelText<HTMLInputElement>(/new/i));

    await userEvent.type(
      canvas.getByLabelText<HTMLInputElement>(/description/i),
      'old fashioned style glazed donut'
    );
  },
};

export const CreateDonut: Story = {
  ...FillForm,
  play: async (context) => {
    await FillForm.play?.(context);
    const { canvasElement, args } = context;
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByRole<HTMLButtonElement>('button', {
        name: /create/i,
      })
    );

    await expect(args.create).toHaveBeenCalledWith({
      description: 'old fashioned style glazed donut',
      icon: 'glazed-fudge',
      name: 'Old Fashioned Glazed',
      price: 500,
      promo: 'new',
    });
  },
};

export const ResetForm: Story = {
  ...FillForm,
  play: async (context) => {
    await FillForm.play?.(context);
    const { canvasElement } = context;
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByRole<HTMLButtonElement>('button', {
        name: /reset/i,
      })
    );

    await expect(canvas.getByLabelText<HTMLInputElement>(/name/i).value).toBe(
      ''
    );
  },
};
