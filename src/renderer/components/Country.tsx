import * as Vue from 'vue-tsx-support';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export interface CountryProps {
  ssl?: boolean;
  code?: string;
  retina?: boolean;
  local?: boolean;
}

export interface CountryEvents {
  onClick: MouseEvent;
}

@Component
export default class Country extends Vue.Component<
  CountryProps,
  CountryEvents
> {
  @Prop({ type: Boolean, required: false, default: false })
  private readonly ssl!: boolean;

  @Prop({ type: String, required: false, default: 'auto' })
  private readonly code!: string;

  @Prop({ type: Boolean, required: false, default: true })
  private readonly retina!: boolean;

  @Prop({ type: Boolean, required: false, default: true })
  private readonly local!: boolean;

  private get src() {
    return this.local
      ? require(`assets/img/${this.code}-2x.png`) // eslint-disable-line
      : `http://${this.ssl ? 'ssl-' : ''}api.itranslateapp.com/flags/${this.code}${this.retina ? '-2x' : ''}.png`; // prettier-ignore
  }

  private handleClick(e: MouseEvent) {
    this.$emit('click', e);
  }

  render() {
    return <img src={this.src} draggable={false} onClick={this.handleClick} />;
  }
}
