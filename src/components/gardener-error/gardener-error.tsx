import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'gardener-error',
  shadow: false,
})
export class GardenerError {
  @Prop() error: string;

  render() {
    return (
      <div class="absolute w-full h-full bg-black bg-opacity-50 z-50">
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md">
          <h1 class="text-2xl text-red-500 font-bold">Error</h1>
          <p>{this.error}</p>
        </div>
      </div>
    );
  }

}
