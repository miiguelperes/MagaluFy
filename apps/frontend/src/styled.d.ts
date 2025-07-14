import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      primary: string;
      text: string;
      sidebar: string;
      card: string;
    };
  }
} 