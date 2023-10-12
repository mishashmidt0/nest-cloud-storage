import { diskStorage } from 'multer';
const generateId = (): string => {
  return Array(18)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
};

const normalizerFileName = (_, file, callback) => {
  const fileExtName = file.originalname.split(',').pop();
  callback(null, `${generateId()}.${fileExtName}`);
};
export const fileStorage = diskStorage({
  destination: './uploads',
  filename: normalizerFileName,
});
