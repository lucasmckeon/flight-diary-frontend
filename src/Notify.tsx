const Notify = ({ message }: { message: string }) => {
  return message ? <p>{message}</p> : null;
};

export { Notify };
