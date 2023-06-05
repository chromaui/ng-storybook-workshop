import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { rest } from 'msw';
import { userEvent, waitFor, within, screen } from '@storybook/testing-library';
import { jest, expect } from '@storybook/jest';
import { DonutSingleComponent } from './donut-single.component';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';

const mockRouter = {
  navigate: jest.fn(),
};

const meta: Meta<DonutSingleComponent> = {
  title: 'Containers/DonutSingleComponent',
  component: DonutSingleComponent,
  decorators: [
    moduleMetadata({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        // Provide ActivatedRoute with a mock object that
        // has a snapshot defined to simulate a donut edit
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '3',
              }),
              data: { isEdit: true },
            },
          },
        },
        {
          provide: Router,
          useValue: mockRouter,
          // useValue: {
          //   navigate: () => {},
          // },
        },
      ],
    }),
  ],
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
};

export default meta;
type Story = StoryObj<DonutSingleComponent>;

export const UpdateDonut: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get('/api/donuts', (req, res, ctx) => {
          return res(
            ctx.json([
              {
                id: '3',
                name: 'Vanilla sprinkle',
                icon: 'vanilla-sundae',
                price: 200,
                promo: 'limited',
                description: 'new vanilla donut',
              },
            ])
          );
        }),
        rest.put('/api/donuts/3', (req, res, ctx) => {
          return res(
            ctx.json([
              {
                id: '3',
                name: 'Vanilla sprinkle',
                icon: 'vanilla-sundae',
                price: 1500,
                promo: 'new',
                description: 'new vanilla donut',
              },
            ])
          );
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const priceInput = await canvas.findByLabelText<HTMLInputElement>(/price/i);
    await userEvent.clear(priceInput);
    await userEvent.type(priceInput, '1500');

    await userEvent.click(canvas.getByLabelText<HTMLInputElement>(/new/i));

    await userEvent.click(
      canvas.getByRole<HTMLButtonElement>('button', {
        name: /update/i,
      })
    );

    waitFor(
      async () =>
        await expect(mockRouter.navigate).toHaveBeenCalledWith(['admin'])
    );
  },
};
