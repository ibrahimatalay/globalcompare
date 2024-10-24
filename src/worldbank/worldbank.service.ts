import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WorldbankService {
    constructor(private readonly httpService: HttpService) { }

    async fetchFromWB(country: string[], indicator: string) {
        let prepareResponse = { labels: [], datasets: [] };

        try {
            if (Array.isArray(country)) {
                for (const countryItem of country) {
                    const url = `https://api.worldbank.org/v2/country/${countryItem}/indicator/${indicator}?format=json`;
                    const response = await firstValueFrom(this.httpService.get(url));
                    if (response.data && response.data[1]) {
                        prepareResponse = this.transformDataForChart(prepareResponse, response.data[1]);
                    }
                }
            } else if (typeof country === 'string') {
                const url = `https://api.worldbank.org/v2/country/${country}/indicator/${indicator}?format=json`;
                const response = await firstValueFrom(this.httpService.get(url));
                if (response.data && response.data[1]) {
                    prepareResponse = this.transformDataForChart(prepareResponse, response.data[1]);
                }
            }

            prepareResponse.labels.reverse();
            prepareResponse.datasets.forEach(dataset => {
                dataset.data.reverse();
            });

            return prepareResponse;
        } catch (error) {
            console.error('Error fetching data from World Bank API:', error);
            throw new Error('World Bank API request failed');
        }
    }

    private transformDataForChart(response: { labels: any; datasets: any; }, data: { date: any; country: { value: any; }; value: any; }[]) {
        data.forEach((dataItem: { date: any; country: { value: any; }; value: any; }) => {
            if (!response.labels.includes(dataItem.date)) response.labels.push(dataItem.date);

            let countryDataset = response.datasets.find((dataset: { label: any; }) => dataset.label === dataItem.country.value);

            if (!countryDataset) {
                countryDataset = { label: dataItem.country.value, data: [] };
                response.datasets.push(countryDataset);
            }

            countryDataset.data.push(dataItem.value);
        });

        return response;
    }
}
