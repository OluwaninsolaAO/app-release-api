import { Controller, Get, Query } from '@nestjs/common';
import { AppVersionService } from './app-version.service';
import { LookupDto } from './dto/lookup.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReleaseDto } from './dto/release.dto';

@Controller('lookup')
@ApiTags('app release lookup')
export class AppVersionController {
  constructor(private readonly appVersionService: AppVersionService) {}

  @Get()
  @ApiOperation({
    summary:
      'Retrieves the version details of an application based on the provided query parameters.',
    description:
      'This endpoint allows clients to fetch the version information of a application by providing the `packageId` and `platform` as query parameters.',
  })
  @ApiOkResponse({ description: 'Success', type: ReleaseDto })
  async getVersion(@Query() query: LookupDto) {
    const { packageId, platform } = query;
    return this.appVersionService.lookup(packageId, platform);
  }
}
