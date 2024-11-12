



export interface IConvertDomainResponseToJson{
    domain: string;
    availability: boolean;
    message: string;
    price: {
        currency: string;
        amount: string;
        period: string;
    };
    actions: {
        cart_url: string;
        button_text: string;
    };
}

export function convertDomainResponseToJson(htmlResponse: string): IConvertDomainResponseToJson{

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlResponse, 'text/html');

    // Tipando o elemento `domainElement` como `HTMLElement | null`
    const domainElement = doc.querySelector('td span.text-success') as HTMLElement | null;
    const domain: string = domainElement ? domainElement.textContent?.trim() || '' : '';
    const availability: boolean = domainElement !== null;

    // Tipando o elemento `messageElement` como `HTMLElement | null`
    const messageElement = doc.querySelector('td') as HTMLElement | null;
    const message: string  = messageElement ? messageElement.textContent?.split('\n')[0].trim() as string : ''  ;

    // Tipando o elemento `priceElement` como `HTMLElement | null`
    const priceElement = doc.querySelector('.rate') as HTMLElement | null;
    const priceText: string = priceElement ? priceElement.textContent?.trim() || '' : '';
  
    // eslint-disable-next-line no-useless-escape
    const stringPriceRegx=`/(\D+)\s(\d+[\.,\d]*)\/(\w+)/` as string ;
    const priceMatch = priceText.match(stringPriceRegx);

    // Garante valores de moeda, quantia e período
    const currency: string = priceMatch ? priceMatch[1].trim() : '';
    const amount: string = priceMatch ? priceMatch[2] : '';
    const period: string = priceMatch ? priceMatch[3] : '';

    // Tipando o elemento `cartUrlElement` como `HTMLAnchorElement | null`
    const cartUrlElement = doc.querySelector('.domain-buy-now') as HTMLAnchorElement | null;
    const cartUrl: string = cartUrlElement ? cartUrlElement.href : '';
    const buttonText: string = cartUrlElement ? cartUrlElement.textContent?.trim() || '' : '';


    // Retorna o JSON com os dados extraídos
    return {
        domain: domain,
        availability: availability,
        message: message,
        price: {
            currency: currency.trim(),
            amount: amount,
            period: period
        },
        actions: {
            cart_url: cartUrl,
            button_text: buttonText
        }
    };
}
