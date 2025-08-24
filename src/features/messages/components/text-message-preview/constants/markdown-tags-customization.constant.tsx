import { Components } from 'react-markdown';

export const MARKDOWN_TAGS_CUSTOMIZATION: Components = {
  p: ({ _node, ...props }) => <p className='my-1' {...props} />,
  code: ({ _node, ...props }) => <code className='my-1' {...props} />,
  ul: ({ _node, ...props }) => <ul className='m-1 px-4 py-0' {...props} />,
  h1: ({ _node, ...props }) => <h1 className='my-1' {...props} />,
  h2: ({ _node, ...props }) => <h2 className='my-1' {...props} />,
  h3: ({ _node, ...props }) => <h3 className='my-1' {...props} />,
  h4: ({ _node, ...props }) => <h4 className='my-1' {...props} />,
  h5: ({ _node, ...props }) => <h5 className='my-1' {...props} />,
  h6: ({ _node, ...props }) => <h6 className='my-1' {...props} />,
};
