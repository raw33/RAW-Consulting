import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import 'altcha';

interface AltchaProps {
  challengeurl: string;
  onStateChange?: (state: any) => void;
  hidefooter?: boolean;
  hidelogo?: boolean;
  name?: string;
  auto?: 'off' | 'onfocus' | 'onload' | 'onsubmit';
}

const Altcha = forwardRef<{ reset: () => void }, AltchaProps>((props, ref) => {
  const widgetRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    reset: () => widgetRef.current?.reset(),
  }));

  useEffect(() => {
    const { current } = widgetRef;
    if (current) {
      const handler = (ev: any) => {
        if (props.onStateChange) {
          props.onStateChange(ev.detail);
        }
      };
      current.addEventListener('statechange', handler);
      return () => current.removeEventListener('statechange', handler);
    }
  }, [props]);

  return (
    <altcha-widget
      ref={widgetRef}
      challengeurl={props.challengeurl}
      hidefooter={props.hidefooter}
      hidelogo={props.hidelogo}
      name={props.name || 'altcha'}
      auto={props.auto || 'off'}
    />
  );
});

Altcha.displayName = 'Altcha';

export default Altcha;
