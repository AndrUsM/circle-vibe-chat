import { Components } from 'react-markdown';

export const MARKDOWN_TAGS_CUSTOMIZATION: Components = {
  p: ({ node, ...props }) => <p className='my-1' {...props} />,
  code: ({ node, ...props }) => <code className='my-1' {...props} />,
  ul: ({ node, ...props }) => <ul className='m-1 px-4 py-0' {...props} />,
  h1: ({ node, ...props }) => <h1 className='my-1' {...props} />,
  h2: ({ node, ...props }) => <h2 className='my-1' {...props} />,
  h3: ({ node, ...props }) => <h3 className='my-1' {...props} />,
  h4: ({ node, ...props }) => <h4 className='my-1' {...props} />,
  h5: ({ node, ...props }) => <h5 className='my-1' {...props} />,
  h6: ({ node, ...props }) => <h6 className='my-1' {...props} />,
};
