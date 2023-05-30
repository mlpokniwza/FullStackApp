using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using ProjectAPI.Interfaces;
using ProjectAPI.Helpers;

namespace ProjectAPI.Serviecs
{
    public class PhotoService : IPhotoService
    {
        public readonly Cloudinary _cloudinary;
        public PhotoService(IOptions<CloudinarySettings> config){
            var acc = new Account(
                config.Value.Cloud,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }
        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var uploadParam = new  ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face"),
                    Folder = "da-net7"
                };
                uploadResult = await _cloudinary.UploadAsync(uploadParam);
            }

            return uploadResult;
        }

        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            var deleteParam = new DeletionParams(publicId);

            return await _cloudinary.DestroyAsync(deleteParam);
        }
    }
}